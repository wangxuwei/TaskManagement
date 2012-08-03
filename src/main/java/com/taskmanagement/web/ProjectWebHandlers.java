package com.taskmanagement.web;


import com.britesnow.snow.web.handler.annotation.WebActionHandler;
import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebModel;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.taskmanagement.dao.DaoRegistry;
import com.taskmanagement.dao.ProjectDao;
import com.taskmanagement.dao.UserDao;
import com.taskmanagement.entity.Project;
import com.taskmanagement.entity.User;

import java.util.Map;

@Singleton
public class ProjectWebHandlers {
    @Inject
    DaoRegistry daoRegistry;

    @Inject
    ProjectDao projectDao;
    @Inject
    UserDao userDao;

    @WebActionHandler
    public void addUser(@WebParam("projectId") Long projectId, @WebParam("userId") Long userId) {
        if (projectId != null) {
            Project project = daoRegistry.getDao(Project.class).get(projectId);
            if (project != null) {
                User user = daoRegistry.getDao(User.class).get(userId);
                if (user != null) {
                    project.getUserSet().add(user);
                    daoRegistry.getDao(Project.class).save(project);
                }
            }
        }
    }

    @WebActionHandler
    public void removeUser(@WebParam("projectId") Long projectId, @WebParam("userId") Long userId) {
        if (projectId != null) {
            Project project = daoRegistry.getDao(Project.class).get(projectId);
            if (project != null) {
                User user = daoRegistry.getDao(User.class).get(userId);
                if (user != null) {
                    project.getUserSet().remove(user);
                    daoRegistry.getDao(Project.class).save(project);
                }
            }
        }
    }


    @WebModelHandler(startsWith = "/getUsersNotInProject")
    public void getUsersNotInProject(@WebParam("projectId") Long id, @WebModel Map map) {
        if (id != null) {
            map.put("users", projectDao.getUsersNotInProject(id));
        }
    }

    @WebModelHandler(startsWith = "/getJoinProjects")
    public void getJoinProjects(@WebParam("userId") Long id, @WebModel Map map) {
        if (id != null) {
            map.put("projects", userDao.getJoinProjects(id));
        }
    }

    @WebModelHandler(matches = "/getCreateProjects")
    public void getCreateProjects(@WebParam("userId") Long id, @WebModel Map map) {
        if (id != null) {
            map.put("projects", userDao.getCreateProjects(id));
        }
    }


}
