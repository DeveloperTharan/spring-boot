package com.thxran.spring.document;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateDocumentRequest {
    @NotEmpty(message = "update field was mandatory!")
    @NotBlank(message = "update field was mandatory!")
    private String field;

    @NotEmpty(message = "update value was mandatory!")
    @NotBlank(message = "update value was mandatory!")
    private Object value;
}
