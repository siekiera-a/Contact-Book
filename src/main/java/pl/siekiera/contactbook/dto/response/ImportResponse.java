package pl.siekiera.contactbook.dto.response;

import lombok.Value;
import pl.siekiera.contactbook.model.ContactModel;

import java.util.List;

@Value
public class ImportResponse {

    List<ContactModel> contacts;
    Integer imported;
    Integer total;

}
