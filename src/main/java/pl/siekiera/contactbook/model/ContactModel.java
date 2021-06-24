package pl.siekiera.contactbook.model;

import lombok.RequiredArgsConstructor;
import lombok.Value;
import pl.siekiera.contactbook.entity.Contact;

@Value
@RequiredArgsConstructor
public class ContactModel {

    Long id;
    String email;
    String phone;
    String name;

    public ContactModel(Contact contact) {
        id = contact.getId();
        email = contact.getEmail();
        phone = contact.getPhone();
        name = contact.getName();
    }

}
