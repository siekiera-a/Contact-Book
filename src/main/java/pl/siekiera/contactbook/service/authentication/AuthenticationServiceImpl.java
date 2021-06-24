package pl.siekiera.contactbook.service.authentication;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.siekiera.contactbook.entity.User;
import pl.siekiera.contactbook.model.AuthenticationModel;
import pl.siekiera.contactbook.repository.UserRepository;
import pl.siekiera.contactbook.security.UserDetailsImpl;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Optional<AuthenticationModel> login(String email, String password) {
        Optional<User> record = userRepository.findByEmail(email);

        if (record.isEmpty()) {
            return Optional.empty();
        }

        User user = record.get();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return Optional.empty();
        }

        return Optional.of(new AuthenticationModel(user));
    }

    @Override
    public Optional<AuthenticationModel> register(String name, String email, String password) {
        User user = new User(email, name, passwordEncoder.encode(password));
        try {
            userRepository.save(user);
            return Optional.of(new AuthenticationModel(user));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public User getCurrentUser() {
        return ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
    }
}
