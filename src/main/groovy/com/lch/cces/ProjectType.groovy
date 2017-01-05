package com.lch.cces

// import groovy.transform.CompileStatic

// 工作型態
public enum ProjectType implements GenericEnumerable<ProjectType> {
	// // HOURLY('點工'),
	// // SOLICIT('攬工'),
	// // MONTHLY('包月試作'),
	// // ORIGINAL('委外'),
	// // OTHER('其他');
	// //
	// // private static class Holder {
	// // 	static List<String> ids
	// // 	// static List<String> names
	// // 	static Map<String, String> map
	// //
	// // 	static {
	// // 		def valList = ProjectType.values()
	// // 		ids = valList*.getId()
	// // 		// names = valList*.name()
	// // 		map = valList.inject([:]) { res, itm ->
	// // 			res += [(itm.id): itm.desc]
	// // 		}
	// // 	}
	// // }
	// //
	// // @CompileStatic
	// static List<String> ordinals() {
	// // 	return Holder.ids
	// 	return values()*.getId()
	// }
	//
	// // // @CompileStatic
	// // // static List<String> names() {
	// // // 	return Holder.names
	// // // }
	//
	// // @CompileStatic
	// static Map<String, String> map() {
	// // 	return Holder.map
	// 	return values().inject([:]) { res, itm ->
	// 		res += [(itm.id): itm.desc]
	// 	}
	// }
	//
	// // @CompileStatic
	// static ProjectType salvage(def type) {
	// 	if (type == null) {
	// 		return null
	// 	}
	//
	// 	String val = type as String
	// 	int idx = -1
	//
	// 	if (val.size() <= 3) {
	// 		idx = ordinals().findIndexOf{ it == val.toUpperCase() }
	//
	// 	} else {
	// 		try {
	// 			return (val.toUpperCase() as ProjectType)
	//
	// 		} catch (e) {
	// 			// by default: idx == -1
	// 		}
	// 	}
	//
	// 	return idx >=0 ? values()[idx] : null;
	// }

	static int keyLength() {
		return 3
	}

	// /*
	//  *
	//  */
	// private String id
	// private String desc
	//
	// // ProjectType(def desc) {
	ProjectType(String desc) {
		init(desc)
	}
	//
	// String getId() {
	// 	this.id
	// }
	//
	// String getLabel() {
	// 	"$id-$desc"
	// }
	//
	// public String toString() {
	// 	// "$desc"
	// 	"$id"
	// }
}
