package com.itnihongo.kamehouse.model;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User extends AuditModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "fullname", nullable = true)
    private String fullName;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "active", nullable = false)
    private boolean active;

    @Column(name = "del_flag", nullable = false)
    private boolean delFlag;

    @Column(name = "confirmation_token", nullable = false)
    private String confirmationToken;

    @Column(name = "is_temp_password", nullable = false)
    private boolean isTempPassword;

    public User() {
        id = 0;
        username = "";
        email = "";
        password = "";
        fullName = "";
        role = "";
        active = false;
        delFlag = false;
        confirmationToken = "";
        setIsTempPassword(false);
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullName() {
        return this.fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isActive() {
        return this.active;
    }

    public boolean getActive() {
        return this.active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isDelFlag() {
        return this.delFlag;
    }

    public boolean getDelFlag() {
        return this.delFlag;
    }

    public void setDelFlag(boolean delFlag) {
        this.delFlag = delFlag;
    }

    public String getConfirmationToken() {
        return this.confirmationToken;
    }

    public void setConfirmationToken(String confirmationToken) {
        this.confirmationToken = confirmationToken;
    }

    public boolean isIsTempPassword() {
        return this.isTempPassword;
    }

    public boolean getIsTempPassword() {
        return this.isTempPassword;
    }

    public void setIsTempPassword(boolean isTempPassword) {
        this.isTempPassword = isTempPassword;
    }

    @Override
    public boolean equals(Object o) {

        if (o == this) {
            return true;
        }

        if (!(o instanceof User)) {
            return false;
        }

        User u = (User) o;

        return u.getUsername().equals(this.getUsername()) && u.getEmail().equals(this.getEmail())
                && u.getRole().equals(this.getRole()) && (u.getActive() == this.getActive());
    }

}