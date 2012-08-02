package com.taskmanagement.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

/**
 * User
 */
@Entity
@Table(name = "tm.tmuser")
@javax.persistence.SequenceGenerator(name = "SEQ_STORE", allocationSize = 1, sequenceName = "tm.tmuser_id_seq")
public class User extends BaseEntity {
    private String name;
    private String username;
    private String password;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE }, fetch = FetchType.EAGER)
    @JoinTable(name = "project_user", joinColumns = { @JoinColumn(name = "user_id") }, inverseJoinColumns = { @JoinColumn(name = "project_id") })
    private Set<Project>    projectSet;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set getProjectSet() {
        return projectSet;
    }

    public void setProjectSet(Set projectSet) {
        this.projectSet = projectSet;
    }
}
