package com.thxran.spring.auth;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "authentication")
public class AuthenticationController {
    private final AuthentcationService service;

    @PostMapping("/sign-up")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> signUp(
            @RequestBody @Valid RegistrationRequest request
    ) {
        service.signup(request);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/sign-in")
    public ResponseEntity<AuthenticationResponse> signIn(
            @RequestBody @Valid AuthenticationRequest request
    ){
        return ResponseEntity.ok(service.signin(request));
    }
}
