package com.thxran.spring.document;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DocumentService {
    private final DocumentRepository repository;

    public Document createDocument(Document request) {
        var document = Document.builder()
                .username(request.getUsername())
                .parentDocument(request.getParentDocument())
                .build();

        document = repository.save(document);

        String url = "http://localhost:3000/document/" + document.getId() + "?isPublished=" + document.isPublished();
        document.setUrl(url);

        return repository.save(document);
    }

    public List<Document> getDocumentsByUsername(String username) {
        return repository.findAllByUsername(username).stream().toList();
    }

    public Optional<Document> getDocumentById(UUID id) {
        return repository.findById(id);
    }

    public Document updateDocumentById(UUID id, String field, Object value) {
        Optional<Document> optionalDocument = repository.findById(id);

        if (optionalDocument.isPresent()) {
            return updateDocumentById(optionalDocument.get(), field, value);
        } else {
            throw new IllegalArgumentException("Document with ID " + id + " not found.");
        }
    }

    private Document updateDocumentById(Document document, String field, Object value) {
        boolean isPublishedBeforeUpdate = document.isPublished();

        switch (field) {
            case "title":
                document.setTitle((String) value);
                break;
            case "content":
                document.setContent((String) value);
                break;
            case "icon":
                document.setIcon((String) value);
                break;
            case "coverImage":
                document.setCoverImage((String) value);
                break;
            case "isPublished":
                document.setPublished((boolean) value);
                break;
            case "isFavorite":
                document.setFavorite((boolean) value);
                break;
            case "isArchived":
                document.setArchived((boolean) value);
                break;
            default:
                throw new IllegalArgumentException("Field '" + field + "' is not supported for update.");
        }

        if (isPublishedBeforeUpdate != document.isPublished()) {
            String url = "http://localhost:3000/document/" + document.getId() + "?isPublished=" + document.isPublished();
            document.setUrl(url);
        }

        return repository.save(document);
    }
}
