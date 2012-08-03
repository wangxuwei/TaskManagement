package com.taskmanagement.dao;

import java.util.ArrayList;
import java.util.List;

import com.taskmanagement.entity.Project;
import com.taskmanagement.entity.User;

public class UserDao extends BaseHibernateDao<User> {
    public List<Project> getJoinProjects(Long userId) {
        User user = get(userId);
        if (user != null) {
            return new ArrayList(user.getProjectSet());
        }
        return null;
    }

    public List<Project> getCreateProjects(Long userId) {
        String hql = "from Project where createdBy_id=" + userId;
        List ls = search(hql, null);
        return ls;
    }
}
