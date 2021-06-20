package pl.siekiera.contactbook.repository;

import org.springframework.data.repository.CrudRepository;
import pl.siekiera.contactbook.entity.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByEmail(String email);

}
