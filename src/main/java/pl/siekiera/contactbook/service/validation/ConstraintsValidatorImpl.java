package pl.siekiera.contactbook.service.validation;

import org.springframework.stereotype.Service;

@Service
public class ConstraintsValidatorImpl implements ConstraintsValidator{

    @Override
    public boolean validEmail(String email) {
        if (email == null || email.isBlank()) {
            return false;
        }

        return email.matches("[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+");
    }

    @Override
    public boolean validPhoneNumber(String phone) {
        if (phone == null || phone.isBlank()) {
            return false;
        }

        return phone.matches("[1-9][0-9]{8}");
    }

    @Override
    public boolean validName(String name) {
        if (name == null || name.isBlank()) {
            return false;
        }

        return name.length() > 3;
    }
}
