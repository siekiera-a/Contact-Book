package pl.siekiera.contactbook.service.contact;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.siekiera.contactbook.dto.request.ContactRequest;
import pl.siekiera.contactbook.dto.response.SuccessResponse;
import pl.siekiera.contactbook.entity.Contact;
import pl.siekiera.contactbook.entity.User;
import pl.siekiera.contactbook.model.ContactModel;
import pl.siekiera.contactbook.repository.ContactRepository;
import pl.siekiera.contactbook.repository.UserRepository;
import pl.siekiera.contactbook.service.validation.ConstraintsValidator;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;
    private final UserRepository userRepository;
    private final ConstraintsValidator constraintsValidator;

    @Override
    @Transactional
    public boolean add(User user, String name, String email, String phone) {
        if (!constraintsValidator.validEmail(email) &&
            !constraintsValidator.validPhoneNumber(phone) ||
            !constraintsValidator.validName(name)) {
            return false;
        }

        if (contactRepository.existsContactByNameAndUser(name, user)) {
            return false;
        }

        Contact contact = new Contact(name, email, phone);
        user.addContact(contact);
        contactRepository.save(contact);
        userRepository.save(user);
        return true;
    }

    @Override
    public List<ContactModel> getContacts(User user) {
        return user.getContacts().stream()
            .map(ContactModel::new)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SuccessResponse deleteContact(User user, Long contactId) {
        Optional<Contact> contactOptional = contactRepository.findById(contactId);

        if (contactOptional.isEmpty()) {
            return new SuccessResponse(false, "Contact not found!");
        }

        Contact contact = contactOptional.get();
        if (user.equals(contact.getUser())) {
            contactRepository.delete(contact);
            user.deleteContact(contact);
            userRepository.save(user);
            return new SuccessResponse(true, "Deleted contact with id " + contactId);
        }

        return new SuccessResponse(false, "You are not the owner of contact!");
    }

    @Override
    @Transactional
    public SuccessResponse updateContact(User user, Long id, String name, String email,
                                         String phone) {
        if (!constraintsValidator.validName(name)) {
            return new SuccessResponse(false, "Invalid contact name!");
        }

        if (email == null && phone == null) {
            return new SuccessResponse(false, "Email or phone number must be specified!");
        }

        if (email != null && !constraintsValidator.validEmail(email)) {
            return new SuccessResponse(false, "Invalid email!");
        }

        if (phone != null && !constraintsValidator.validPhoneNumber(phone)) {
            return new SuccessResponse(false, "Invalid phone number!");
        }

        Optional<Contact> optionalContact = contactRepository.findById(id);

        if (optionalContact.isEmpty()) {
            return new SuccessResponse(false, "Contact not found!");
        }

        Contact contact = optionalContact.get();

        if (!user.equals(contact.getUser())) {
            return new SuccessResponse(false, "You are not the owner of contact!");
        }

        if (!contact.getName().equals(name) && contactRepository.existsContactByNameAndUser(name,
            user)) {
            return new SuccessResponse(false, "Contact with that name already exists!");
        }

        contact.setEmail(email);
        contact.setPhone(phone);
        contact.setName(name);
        contactRepository.save(contact);
        return new SuccessResponse(true, "Updated!");
    }

    @Override
    @Transactional
    public int importContacts(User user, List<ContactRequest> contacts) {
        List<String> contactsNames =
            user.getContacts().stream()
                .map(Contact::getName)
                .collect(Collectors.toList());

        List<Contact> entities = contacts.stream()
            .filter(c -> !contactsNames.contains(c.getName()))
            .map(c -> new Contact(c.getName(), c.getEmail(), c.getPhone()))
            .collect(Collectors.toList());

        entities.forEach(user::addContact);
        contactRepository.saveAll(entities);
        userRepository.save(user);

        return entities.size();
    }

}
