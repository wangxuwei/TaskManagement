package com.taskmanagement.dao;

import java.util.List;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import com.britesnow.snow.testsupport.SnowTestSupport;
import com.britesnow.snow.web.db.hibernate.HibernateSessionInViewHandler;

public class UserDaoTest extends SnowTestSupport {
    @BeforeClass
    public static void initTestClass() throws Exception {
        SnowTestSupport.initWebApplication("src/main/webapp");
    }

    @Test
    public void testEntity() {
        HibernateSessionInViewHandler view = appInjector.getInstance(HibernateSessionInViewHandler.class);
        view.openSessionInView();
        System.out.println("begin test...");
        UserDao userDao = appInjector.getInstance(UserDao.class);
        List ls1 = userDao.getCreateProjects(1L);
        List ls2 = userDao.getJoinProjects(1L);
        System.out.println("----1>" + ls1);
        System.out.println(ls2);
    }

    @AfterClass
    public static void dispose() throws Exception {
      //  SnowTestSupport.releaseWebApplicaton();
    }

}