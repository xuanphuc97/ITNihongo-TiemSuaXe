package com.itnihongo.kamehouse.service.impl;

import com.itnihongo.kamehouse.exception.DisableError;
import com.itnihongo.kamehouse.exception.UnauthorizedError;
import com.itnihongo.kamehouse.jwt.JwtTokenProvider;
import com.itnihongo.kamehouse.model.UserDetailsImpl;
import com.itnihongo.kamehouse.service.IAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class AuthServiceImpl implements IAuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;


    @Override
    public String login(String username, String password, HttpServletResponse response) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            return jwtTokenProvider.generateToken(username);
        } catch (DisabledException e) {
            throw new DisableError("The user is not enabled");
        } catch (AuthenticationException e) {
            throw new UnauthorizedError("Invalid username or password");
        }
    }
}
