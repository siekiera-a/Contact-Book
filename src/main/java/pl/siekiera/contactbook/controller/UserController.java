package pl.siekiera.contactbook.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.siekiera.contactbook.dto.request.LoginRequest;
import pl.siekiera.contactbook.dto.request.RegisterRequest;
import pl.siekiera.contactbook.model.AuthenticationModel;
import pl.siekiera.contactbook.service.authentication.AuthenticationService;

import javax.validation.Valid;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
public class UserController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationModel> login(@Valid @RequestBody LoginRequest req) {
        String email = req.getEmail();
        String password = req.getPassword();

        Optional<AuthenticationModel> auth = authenticationService.login(email, password);
        return auth.map(a -> new ResponseEntity<>(a, HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.UNAUTHORIZED));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationModel> register(@Valid @RequestBody RegisterRequest req) {
        String email = req.getEmail();
        String name = req.getName();
        String password = req.getPassword();

        Optional<AuthenticationModel> auth = authenticationService.register(name, email, password);
        return auth.map(a -> new ResponseEntity<>(a, HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.CONFLICT));
    }

}
