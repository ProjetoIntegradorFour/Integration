package com.libapp.backend.dto;

import java.util.List;

public class UserUpdateRequest {
    private String name;
    private String cpf;
    private List<String> roles;

    public UserUpdateRequest() {
    }

    public UserUpdateRequest(String name, String cpf, List<String> roles) {
        this.name = name;
        this.cpf = cpf;
        this.roles = roles;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}