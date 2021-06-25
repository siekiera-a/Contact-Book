package pl.siekiera.contactbook.service.contact;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.siekiera.contactbook.entity.Contact;
import pl.siekiera.contactbook.entity.User;
import pl.siekiera.contactbook.model.ContactModel;
import pl.siekiera.contactbook.repository.ContactRepository;
import pl.siekiera.contactbook.repository.UserRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public boolean add(User user, String name, String email, String phone) {
        if (email == null && phone == null) {
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
        Optional<Contact> contactOptional =  contactRepository.findById(contactId);

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

}
