package com.taskmanagement.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class BaseEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="SEQ_STORE")
    private Long    id;
    
    @Column(name="createdby_id")
    private Long    createdBy_id;
    @Column(name="created_date")
    private Date    createdDate;
    @Column(name="updatedby_id")
    private Long    updatedBy_id;
    @Column(name="updated_date")
    private Date    updatedDate;

    // --------- Persistent Getters & Setters --------- //
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCreatedBy_id() {
        return createdBy_id;
    }

    public void setCreatedBy_id(Long createdBy_id) {
        this.createdBy_id = createdBy_id;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Long getUpdatedBy_id() {
        return updatedBy_id;
    }

    public void setUpdatedBy_id(Long updatedBy_id) {
        this.updatedBy_id = updatedBy_id;
    }

    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }
    // --------- /Persistent Getters & Setters --------- //
}
