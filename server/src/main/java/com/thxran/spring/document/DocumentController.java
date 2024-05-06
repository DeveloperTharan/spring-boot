package com.thxran.spring.document;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/doc")
@RequiredArgsConstructor
@Tag(name = "document")
public class DocumentController {
    private final DocumentService service;

    @PostMapping("/document")
    public ResponseEntity<Document> createDocument(@RequestBody Document request) {
        return ResponseEntity.accepted().body(service.createDocument(request));
    }

    @GetMapping("/documents")
    public ResponseEntity<List<Document>> getDocuments(@RequestBody Document request) {
        return ResponseEntity.ok(service.getDocumentsByUsername(request.getUsername()));
    }

    @GetMapping("/document/{id}")
    public ResponseEntity<Optional<Document>> getDocument(@PathVariable UUID id) {
        return ResponseEntity.ok(service.getDocumentById(id));
    }

    @PatchMapping("/document/{id}")
    public ResponseEntity<Document> updateDocument(
            @PathVariable UUID id,
            @RequestBody UpdateDocumentRequest request
    ) {
        return ResponseEntity.ok(service.updateDocumentById(
                id,
                request.getField(),
                request.getValue())
        );
    }
}
