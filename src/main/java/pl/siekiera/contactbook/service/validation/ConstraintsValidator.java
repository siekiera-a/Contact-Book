package pl.siekiera.contactbook.service.validation;

public interface ConstraintsValidator {

    boolean validEmail(String email);

    boolean validPhoneNumber(String phone);

    boolean validName(String name);

}
