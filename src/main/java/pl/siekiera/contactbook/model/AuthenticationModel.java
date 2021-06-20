package pl.siekiera.contactbook.model;

import lombok.RequiredArgsConstructor;
import lombok.Value;
import pl.siekiera.contactbook.entity.User;

import java.util.List;
import java.util.stream.Collectors;

@Value
@RequiredArgsConstructor
public class AuthenticationModel {

    UserModel user;
    List<ContactModel> contacts;

    public AuthenticationModel(User user) {
        this.user = new UserModel(user);
        contacts = user.getContacts().stream()
            .map(ContactModel::new)
            .collect(Collectors.toList());
    }

}
