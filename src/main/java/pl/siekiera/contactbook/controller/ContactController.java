package pl.siekiera.contactbook.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.siekiera.contactbook.dto.request.ContactRequest;
import pl.siekiera.contactbook.entity.User;
import pl.siekiera.contactbook.model.ContactModel;
import pl.siekiera.contactbook.service.authentication.AuthenticationService;
import pl.siekiera.contactbook.service.contact.ContactService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;
    private final AuthenticationService authenticationService;

    public ResponseEntity<List<ContactModel>> add(@Valid @RequestBody ContactRequest contact) {
        User user = authenticationService.getCurrentUser();
        String name = contact.getName();
        String phone = contact.getPhone();
        String email = contact.getEmail();

        boolean added = contactService.add(user, name, email, phone);

        if (added) {
            return new ResponseEntity<>(contactService.getContacts(user), HttpStatus.OK);
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }

}
