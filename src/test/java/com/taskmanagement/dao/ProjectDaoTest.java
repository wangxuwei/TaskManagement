package com.taskmanagement.dao;

import java.util.HashSet;
import java.util.List;

import org.junit.BeforeClass;
import org.junit.Test;

import com.britesnow.snow.testsupport.SnowTestSupport;
import com.britesnow.snow.web.db.hibernate.HibernateDaoHelper;
import com.britesnow.snow.web.db.hibernate.HibernateSessionInViewHandler;
import com.taskmanagement.entity.Project;
import com.taskmanagement.entity.User;

public class ProjectDaoTest extends SnowTestSupport {
//    @BeforeClass
//    public static void initTestClass() throws Exception {
//        SnowTestSupport.initWebApplication("src/main/webapp");
//    }
//
//    @Test
//    public void testEntity() {
//        HibernateSessionInViewHandler view = appInjector.getInstance(HibernateSessionInViewHandler.class);
//        view.openSessionInView();
//        System.out.println("begin test...");
//        ProjectDao projectDao = appInjector.getInstance(ProjectDao.class);
//        UserDao userDao = appInjector.getInstance(UserDao.class);
//        String hql = "from User";
//        List ls = userDao.search(hql, null);
//        if (ls.size() == 0) {
//            User user = new User();
//            user.setName("super");
//            user.setPassword("1");
//            user.setUsername("username1");
//            User user2 = new User();
//            user2.setName("client1");
//            user2.setPassword("1");
//            user2.setUsername("client1");
//            User user3 = new User();
//            user3.setName("client2");
//            user3.setPassword("1");
//            user3.setUsername("client2");
//            user = userDao.save(user);
//            user2 = userDao.save(user2);
//            user3 = userDao.save(user3);
//            ls = userDao.search(hql, null);
//        }
//
//        Project project = new Project();
//        project.setName("testProject" + Math.random());
//        project = projectDao.save(project);
//
//        List ls1 = projectDao.getUsersNotInProject(project.getId());
//        System.out.println("--1-->" + ls1.size());
//        project.setUserSet(new HashSet(ls));
//        project = projectDao.save(project);
//        ls1 = projectDao.getUsersNotInProject(project.getId());
//        System.out.println("--2-->" + ls1.size());
//        projectDao.delete(project);
//        HibernateDaoHelper daoHelper = appInjector.getInstance(HibernateDaoHelper.class);
//        daoHelper.executeHql("delete Project s where 1=1 and id=" + project.getId());
//    }
}