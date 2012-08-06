package com.taskmanagement.dao;

import java.util.List;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import com.britesnow.snow.testsupport.SnowTestSupport;
import com.britesnow.snow.web.db.hibernate.HibernateSessionInViewHandler;
import com.taskmanagement.entity.User;

public class UserDaoTest extends SnowTestSupport {
    @BeforeClass
    public static void initTestClass() throws Exception {
        SnowTestSupport.initWebApplication("src/main/webapp");
    }

    @Test
    public void testEntity() {
        HibernateSessionInViewHandler view = appInjector.getInstance(HibernateSessionInViewHandler.class);
        view.openSessionInView();
        System.out.println("begin test UserDaoTest...");
        UserDao userDao = appInjector.getInstance(UserDao.class);
        String hql = "from User";
        List ls = userDao.search(hql, null);
        for (int i = 0; i < ls.size(); i++) {
            User u = (User) ls.get(i);
            List ls1 = userDao.getCreateProjects(u.getId());
            List ls2 = userDao.getJoinProjects(u.getId());
            System.out.println("----1>" + ls1);
            System.out.println("----2>" + ls2);
        }
    }

    @AfterClass
    public static void dispose() throws Exception {
        // SnowTestSupport.releaseWebApplicaton();
    }

}