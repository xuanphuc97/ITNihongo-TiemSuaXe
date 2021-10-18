package com.itnihongo.kamehouse.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnauthorizedError extends RuntimeException {
    public UnauthorizedError (String message) {
        super(message);
    }
}
