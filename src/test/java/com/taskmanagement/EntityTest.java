package com.taskmanagement;

import java.util.List;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import com.britesnow.snow.testsupport.SnowTestSupport;
import com.britesnow.snow.web.db.hibernate.HibernateSessionInViewHandler;
import com.taskmanagement.dao.ProjectDao;
import com.taskmanagement.dao.TaskDao;
import com.taskmanagement.dao.UserDao;
import com.taskmanagement.entity.User;

public class EntityTest extends SnowTestSupport {
    @BeforeClass
    public static void initTestClass() throws Exception {
        SnowTestSupport.initWebApplication("src/main/webapp");
    }

    @Test
    public void testEntity() {
        HibernateSessionInViewHandler view = appInjector.getInstance(HibernateSessionInViewHandler.class);
        view.openSessionInView();
        System.out.println("begin test entity.");

        UserDao userDao = appInjector.getInstance(UserDao.class);
        TaskDao taskDao = appInjector.getInstance(TaskDao.class);
        ProjectDao projectDao = appInjector.getInstance(ProjectDao.class);

        String hql = "from Task";
        List ls1 = taskDao.search(hql, null);
        taskDao.delete(ls1);

        hql = "from Project";
        List ls2 = projectDao.search(hql, null);
        projectDao.delete(ls2);

        hql = "from User";
        List ls3 = userDao.search(hql, null);
        System.out.println("--->" + ls3.size());
        for (int i = 0; i < ls3.size(); i++) {
            User user = (User) ls3.get(i);
            System.out.println("delete User:" + user.getUsername());
            userDao.delete(user);
        }
        User user = new User();
        user.setName("super");
        user.setPassword("1");
        user.setUsername("username1");

        User user2 = new User();
        user2.setName("client1");
        user2.setPassword("1");
        user2.setUsername("client1");

        User user3 = new User();
        user3.setName("client2");
        user3.setPassword("1");
        user3.setUsername("client2");

        userDao.save(user);
        userDao.save(user2);
        userDao.save(user3);

        hql = "from User";
        List ls = userDao.search(hql, null);
        Assert.assertTrue(ls.size() == 3);
    }
}
