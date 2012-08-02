package com.taskmanagement.web;


import com.britesnow.snow.web.handler.annotation.WebActionHandler;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.taskmanagement.dao.DaoRegistry;
import com.taskmanagement.entity.Project;
import com.taskmanagement.entity.User;

@Singleton
public class ProjectWebHandlers {
    @Inject
    DaoRegistry daoRegistry;

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


}
