package pl.siekiera.contactbook.service.contact;

import pl.siekiera.contactbook.entity.Contact;
import pl.siekiera.contactbook.entity.User;
import pl.siekiera.contactbook.model.ContactModel;

import java.util.List;

public interface ContactService {

    boolean add(User user, String name, String email, String phone);

    List<ContactModel> getContacts(User user);

    boolean deleteContact(User user, Long contactId);

    boolean updateContact(User user, Long id, String name, String email, String phone);

}
