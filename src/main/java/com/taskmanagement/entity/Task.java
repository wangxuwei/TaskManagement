package com.taskmanagement.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Task
 */
@Entity
@Table(name = "tm.task")
@javax.persistence.SequenceGenerator(name = "SEQ_STORE", allocationSize = 1, sequenceName = "tm.task_id_seq")
public class Task extends BaseEntity {
    private String  name;
    private String  description;

    private String  state;
    private Date    start_date;
    private Date    end_date;

    @ManyToOne
    @JoinColumn(name = "assignee_id", insertable = false, updatable = false)
    private User    assignee;
    private Long    assignee_id;
    
    @ManyToOne
    @JoinColumn(name = "project_id", insertable = false, updatable = false)
    private Project project;
    private Long    project_id;

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

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Date getStart_date() {
        return start_date;
    }

    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }

    public Date getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Date end_date) {
        this.end_date = end_date;
    }

    public Long getAssignee_id() {
        return assignee_id;
    }

    public void setAssignee_id(Long assignee_id) {
        this.assignee_id = assignee_id;
    }

    public Long getProject_id() {
        return project_id;
    }

    public void setProject_id(Long project_id) {
        this.project_id = project_id;
    }
}
