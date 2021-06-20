package pl.siekiera.contactbook.model;

import lombok.RequiredArgsConstructor;
import lombok.Value;
import pl.siekiera.contactbook.entity.User;

@Value
@RequiredArgsConstructor
public class UserModel {

    String name;
    String email;

    public UserModel(User user) {
        name = user.getName();
        email = user.getEmail();
    }

}
