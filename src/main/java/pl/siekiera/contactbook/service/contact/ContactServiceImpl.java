package pl.siekiera.contactbook.service.contact;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.siekiera.contactbook.dto.request.ContactRequest;
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
    public boolean deleteContact(User user, Long contactId) {
        Optional<Contact> contactOptional = contactRepository.findById(contactId);

        if (contactOptional.isEmpty()) {
            return false;
        }

        Contact contact = contactOptional.get();
        if (user.equals(contact.getUser())) {
            contactRepository.delete(contact);
            user.deleteContact(contact);
            userRepository.save(user);
            return true;
        }

        return false;
    }

    @Override
    @Transactional
    public boolean updateContact(User user, Long id, String name, String email, String phone) {
        if (!constraintsValidator.validEmail(email) &&
            !constraintsValidator.validPhoneNumber(phone) ||
            !constraintsValidator.validName(name)) {
            return false;
        }


        Optional<Contact> optionalContact = contactRepository.findById(id);

        if (optionalContact.isEmpty()) {
            return false;
        }

        Contact contact = optionalContact.get();

        if (!user.equals(contact.getUser())) {
            return false;
        }

        if (!contact.getName().equals(name) && contactRepository.existsContactByNameAndUser(name,
            user)) {
            return false;
        }

        contact.setEmail(email);
        contact.setPhone(phone);
        contact.setName(name);
        contactRepository.save(contact);
        return true;
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
        userRepository.save(user);

        return entities.size();
    }

}
