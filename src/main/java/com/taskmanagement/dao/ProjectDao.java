package com.taskmanagement.dao;

import java.util.List;

import org.hibernate.Query;
import java.util.*;
import com.taskmanagement.entity.Project;
import com.taskmanagement.entity.User;

public class ProjectDao extends BaseHibernateDao<Project> {
    public List<User> getUsersNotInProject(Long projectId) {
        Project project = get(projectId);
        String hql = "select p from User p where 1=1";
        Query query = daoHelper.getSession().createQuery(hql);
        Set userSet = project.getUserSet();
        if (userSet != null) {
            hql += " and  p not in (:users) ";
            query = daoHelper.getSession().createQuery(hql);
            query.setParameterList("users", userSet);
        }
        List ls = query.list();
        return ls;
    }
}
