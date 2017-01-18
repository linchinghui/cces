package com.lch.aid

import java.lang.reflect.*
import sun.reflect.*
import com.lch.aaa.*

class DynamicEnumMaker {
	private static class Holder {
		static def reflectionFactory = ReflectionFactory.reflectionFactory
	}

	public static final String ENUM_PACKAGE = 'com.lch.cces.'

	public static void reloadFrom(filePath, clazz) {
		/*DynamicEnumMaker.*/clear(clazz)
		/*DynamicEnumMaker.*/loadFrom(filePath)
	}

	public static def loadFrom(filePath) {
		def configObject = Application.loadConfiguration(filePath)
		def config = configObject.entrySet().first()
		def className = config.key.capitalize()
		def clazz = Class.forName(ENUM_PACKAGE + className)
		config.value.each {
			/*DynamicEnumMaker.*/add(clazz, it.name, [it.desc] as Object[])
		}
		return configObject
	}

	// @SuppressWarnings("unchecked")
    public static <T extends Enum<?>> void clear(Class<T> enumType) {
		def valuesField = enumType.declaredFields.find {
			it.name == '$VALUES'
		}

		AccessibleObject.setAccessible([valuesField] as Field[], true)
		// try {
			setFailsafeFieldValue(valuesField, null, [].toArray((T[]) Array.newInstance(enumType, 0)))
			blankField(enumType, 'enumConstantDirectory')	// Oracle/Sun JDK
	        blankField(enumType, 'enumConstants')			// IBM JDK
		// } catch (e) {
		//		e.printStackTrace()
		//		throw new RuntimeException(e.message, e)
		// }
	}

	// @SuppressWarnings("unchecked")
    public static <T extends Enum<?>> void add(Class<T> enumType, String enumName, Object[] enumArgs) {
		def valuesField = enumType.declaredFields.find {
			it.name == '$VALUES'
		}

		AccessibleObject.setAccessible([valuesField] as Field[], true)

		// try {
			def values  = valuesField.get(enumType)
			def args    = new Object[enumArgs.size() + 2]
			    args[0] = enumName
			    args[1] = Integer.valueOf(values.size())

			System.arraycopy(enumArgs, 0, args, 2, enumArgs.size())

			def newValues = values.collect()

			newValues.add(
				enumType.cast(
					Holder.reflectionFactory.newConstructorAccessor(
						enumType.declaredConstructors[0]
					).newInstance(args)
				)
			)

			setFailsafeFieldValue(valuesField, null, newValues.toArray((T[]) Array.newInstance(enumType, 0)))
			blankField(enumType, 'enumConstantDirectory')	// Oracle/Sun JDK
	        blankField(enumType, 'enumConstants')			// IBM JDK
		// } catch (e) {
		//		e.printStackTrace()
		//		throw new RuntimeException(e.message, e)
		// }
	}

	private static void blankField(Class<?> enumType, String fieldName) throws NoSuchFieldException, IllegalAccessException {
		def field = Class.class.declaredFields.find {
			it.name == fieldName
		}
		if (field != null) {
			AccessibleObject.setAccessible([field] as Field[], true)
			setFailsafeFieldValue(field, enumType, null);
		}
    }
	private static void setFailsafeFieldValue(Field field, Object target, Object value) throws NoSuchFieldException, IllegalAccessException {
        field.setAccessible(true)
        def modifiersField = Field.class.getDeclaredField('modifiers')
        modifiersField.setAccessible(true)
        // int modifiers = modifiersField.getInt(field)
        // modifiers &= ~Modifier.FINAL
		// modifiersField.setInt(field, modifiers)
		modifiersField.setInt(field, modifiersField.getInt(field) & ~Modifier.FINAL)
        Holder.reflectionFactory.newFieldAccessor(field, false).set(target, value)
    }
}
