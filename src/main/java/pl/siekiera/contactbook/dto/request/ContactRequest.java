package pl.siekiera.contactbook.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.validation.constraints.NotBlank;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContactRequest {

    @NotBlank
    String name;

    String email;
    String phone;

}
