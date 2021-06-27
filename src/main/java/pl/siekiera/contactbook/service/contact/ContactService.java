package pl.siekiera.contactbook.service.contact;

import pl.siekiera.contactbook.dto.request.ContactRequest;
import pl.siekiera.contactbook.dto.response.SuccessResponse;
import pl.siekiera.contactbook.entity.User;
import pl.siekiera.contactbook.model.ContactModel;

import java.util.List;

public interface ContactService {

    boolean add(User user, String name, String email, String phone);

    List<ContactModel> getContacts(User user);

    SuccessResponse deleteContact(User user, Long contactId);

    SuccessResponse updateContact(User user, Long id, String name, String email, String phone);

    int importContacts(User user, List<ContactRequest> contacts);

}
