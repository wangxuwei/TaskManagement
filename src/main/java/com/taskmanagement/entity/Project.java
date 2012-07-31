package com.taskmanagement.entity;

import javax.persistence.Entity;
import javax.persistence.Table;


/**
 * Project
 */
@Entity
@Table(name = "tm.project")
@javax.persistence.SequenceGenerator(name = "SEQ_STORE",allocationSize=1,  sequenceName = "tm.project_id_seq")
public class Project extends BaseEntity {
    
    private String name;
    private String description;
    
    
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    
    
    
}
