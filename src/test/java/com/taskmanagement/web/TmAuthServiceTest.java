package com.taskmanagement.web;

import com.britesnow.snow.testsupport.SnowTestSupport;
import com.britesnow.snow.testsupport.mock.RequestContextMock;
import com.britesnow.snow.testsupport.mock.RequestContextMockFactory;
import com.britesnow.snow.util.JsonUtil;
import com.britesnow.snow.util.MapUtil;
import com.britesnow.snow.web.db.hibernate.HibernateDaoHelper;
import com.britesnow.snow.web.db.hibernate.HibernateSessionInViewHandler;
import com.taskmanagement.dao.UserDao;
import com.taskmanagement.entity.User;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.Map;

import static org.junit.Assert.*;


public class TmAuthServiceTest extends SnowTestSupport {

    @BeforeClass
    public static void setUp() throws Exception {
        initWebApplication("src/main/webapp");
    }

    //@Test
    public void testLogin() throws Exception {
        HibernateSessionInViewHandler view = appInjector.getInstance(HibernateSessionInViewHandler.class);
        User user = new User();
        user.setName("test");
        user.setPassword("test");
        user.setUsername("test");
        view.openSessionInView();

        HibernateDaoHelper daoHelper = appInjector.getInstance(HibernateDaoHelper.class);
        UserDao userDao = (UserDao) appInjector.getInstance(UserDao.class);
        daoHelper.executeHql("delete User s where username='test'");
        userDao.save(user);
        view.closeSessionInView();

        RequestContextMock rc = requestContextFactory.createRequestContext(RequestContextMockFactory.RequestMethod.POST, "/_actionResponse.json");
        Map<String, Object> paramMap = (Map<String, Object>) MapUtil.mapIt("action", "login", "username", "test", "password", "test");
        rc.setParamMap(paramMap);

        webController.service(rc);
        String result = rc.getResponseAsString();
        Map map = JsonUtil.toMapAndList(result);

        assertEquals("test", map.get("username"));

    }

    @Test
    public void testRegister() {
        HibernateSessionInViewHandler view = appInjector.getInstance(HibernateSessionInViewHandler.class);
        view.openSessionInView();

        HibernateDaoHelper daoHelper = appInjector.getInstance(HibernateDaoHelper.class);
        daoHelper.executeHql("delete User s where username='xxxxxxxx'");
        view.closeSessionInView();

        RequestContextMock rc = requestContextFactory.createRequestContext(RequestContextMockFactory.RequestMethod.POST, "/_actionResponse.json");
        Map<String, Object> paramMap = (Map<String, Object>) MapUtil.mapIt("action", "register", "username", "xxxxxxxx", "password", "test");
        rc.setParamMap(paramMap);

        webController.service(rc);
        String result = rc.getResponseAsString();
        Map map = JsonUtil.toMapAndList(result);

        assertEquals("xxxxxxxx", map.get("username"));


    }
}
