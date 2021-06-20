package pl.siekiera.contactbook.dto.response;

import pl.siekiera.contactbook.model.ContactModel;
import pl.siekiera.contactbook.model.UserModel;

import java.util.List;

public class AuthenticationResponse {

    UserModel user;
    List<ContactModel> contacts;

}
