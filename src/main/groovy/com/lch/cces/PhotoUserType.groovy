package com.lch.cces

import java.sql.PreparedStatement
import java.sql.ResultSet
import java.sql.SQLException
import org.hibernate.HibernateException
import org.hibernate.engine.spi.SessionImplementor
import org.hibernate.type.StringType
import org.hibernate.usertype.UserType

class PhotoUserType implements UserType {

	public int[] sqlTypes() {
        return [ StringType.INSTANCE.sqlType() ] as int[]
    }

    public Class returnedClass() {
        return Photo.class
    }

    public boolean equals(Object x, Object y) throws HibernateException {
        return x?.equals(y)
    }

    public int hashCode(Object x) throws HibernateException {
        return x?.hashCode()
    }

    public Object nullSafeGet(ResultSet rs, String[] names, SessionImplementor session, Object owner) throws SQLException {
		def filename = StringType.INSTANCE.get(rs, names[0], session)
		return (owner==null || filename==null) ? null : new Photo(owner.class.simpleName, owner.id, filename)
    }

    public void nullSafeSet(PreparedStatement stm, Object photo, int index, SessionImplementor session) throws HibernateException, SQLException {
		// def photo = (Photo)value
		StringType.INSTANCE.set(stm, ((! photo?.multipartFile?.isEmpty()) ? photo.toString() : null), index, session)
    }

	public Object deepCopy(Object x) throws HibernateException {
        return x
    }

    public boolean isMutable() {
        return false
    }

    public Serializable disassemble(Object x) throws HibernateException {
        return (Serializable) x
    }

    public Object assemble(Serializable cached, Object owner) throws HibernateException {
        return cached
    }

	public Object replace(Object original, Object target, Object owner) throws HibernateException {
        return original
    }
}
