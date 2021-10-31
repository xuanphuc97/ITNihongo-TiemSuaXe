package com.itnihongo.kamehouse.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.LOCKED)
public class DisableError extends RuntimeException {
    public DisableError(String message) {
        super(message);
    }
}
