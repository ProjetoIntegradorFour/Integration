package com.libapp.backend.dto;

import java.util.List;

public class ProfileResponse {
    private Long id;
    private String name;
    private String cpf;
    private List<String> roles;

    public ProfileResponse(Long id, String name, String cpf, List<String> roles) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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