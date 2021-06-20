package pl.siekiera.contactbook.service.authentication;

import pl.siekiera.contactbook.model.AuthenticationModel;

import java.util.Optional;

public interface AuthenticationService {

    Optional<AuthenticationModel> login(String email, String password);

    Optional<AuthenticationModel> register(String name, String email, String password);

}
