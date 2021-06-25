package pl.siekiera.contactbook.repository;

import org.springframework.data.repository.CrudRepository;
import pl.siekiera.contactbook.entity.Contact;
import pl.siekiera.contactbook.entity.User;

public interface ContactRepository extends CrudRepository<Contact, Long> {

    boolean existsContactByNameAndUser(String name, User user);

}
