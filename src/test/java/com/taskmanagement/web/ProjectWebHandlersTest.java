package com.taskmanagement.web;

import com.britesnow.snow.testsupport.SnowTestSupport;
import com.britesnow.snow.testsupport.mock.RequestContextMock;
import com.britesnow.snow.testsupport.mock.RequestContextMockFactory;
import com.britesnow.snow.util.MapUtil;
import com.britesnow.snow.web.db.hibernate.HibernateDaoHelper;
import com.britesnow.snow.web.db.hibernate.HibernateSessionInViewHandler;
import com.taskmanagement.dao.ProjectDao;
import com.taskmanagement.dao.UserDao;
import com.taskmanagement.entity.Project;
import com.taskmanagement.entity.User;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.Map;

import static org.junit.Assert.*;

public class ProjectWebHandlersTest extends SnowTestSupport {
    @BeforeClass
    public static void setUp() throws Exception {
        initWebApplication("src/main/webapp");
    }

    @Test
    public void testAddUser() throws Exception {
        HibernateSessionInViewHandler view = appInjector.getInstance(HibernateSessionInViewHandler.class);
        User user = new User();
        user.setName("abcd");
        user.setPassword("test");
        Project project = new Project();
        project.setName("test");
        project.setDescription("test");
        view.openSessionInView();

        HibernateDaoHelper daoHelper = appInjector.getInstance(HibernateDaoHelper.class);
        UserDao userDao = (UserDao) appInjector.getInstance(UserDao.class);
        ProjectDao projectDao = appInjector.getInstance(ProjectDao.class);

        daoHelper.executeHql("delete User s where 1=1");
        daoHelper.executeHql("delete Project s where 1=1");


        userDao.save(user);
        projectDao.save(project);
        view.closeSessionInView();
        RequestContextMock rc = requestContextFactory.createRequestContext(RequestContextMockFactory.RequestMethod.POST, "/addUser.do");
        Map<String, Object> paramMap = (Map<String, Object>) MapUtil.mapIt("projectId", project.getId().toString(), "userId", user.getId().toString());
        rc.setParamMap(paramMap);

        webController.service(rc);

        String result = rc.getResponseAsString();

        assertTrue(true);
    }

    @Test
    public void testRemoveUser() throws Exception {
        HibernateSessionInViewHandler view = appInjector.getInstance(HibernateSessionInViewHandler.class);
        User user = new User();
        user.setName("abcd");
        user.setUsername("test");
        user.setPassword("test");
        Project project = new Project();
        project.setName("test");
        project.setDescription("test");
        view.openSessionInView();

        HibernateDaoHelper daoHelper = appInjector.getInstance(HibernateDaoHelper.class);
        UserDao userDao = (UserDao) appInjector.getInstance(UserDao.class);
        ProjectDao projectDao = appInjector.getInstance(ProjectDao.class);

        daoHelper.executeHql("delete User s where 1=1");
        daoHelper.executeHql("delete Project s where 1=1");


        userDao.save(user);
        projectDao.save(project);
        view.closeSessionInView();
        RequestContextMock rc = requestContextFactory.createRequestContext(RequestContextMockFactory.RequestMethod.POST, "/addUser.do");
        Map<String, Object> paramMap = (Map<String, Object>) MapUtil.mapIt("projectId", project.getId().toString(), "userId", user.getId().toString());
        rc.setParamMap(paramMap);

        webController.service(rc);

        rc = requestContextFactory.createRequestContext(RequestContextMockFactory.RequestMethod.POST, "/removeUser.do");
        paramMap = (Map<String, Object>) MapUtil.mapIt("projectId", project.getId().toString(), "userId", user.getId().toString());
        rc.setParamMap(paramMap);

        webController.service(rc);

        String result = rc.getResponseAsString();

        assertTrue(true);

    }


}
