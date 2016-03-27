package com.lch.aaa

import org.slf4j.Logger
import org.slf4j.LoggerFactory

trait PackageSupportable {
	private static Logger log = LoggerFactory.getLogger(PackageSupportable.class)

	def private static final DEFAULT_PACKAGE_SHORT_NAME = PackageSupportable.class.package.name.split('\\.')[-1]
	def private static final DEFAULT_PACKAGE_PREFIX = PackageSupportable.class.package.name - ~/$DEFAULT_PACKAGE_SHORT_NAME$/

	def packageNames = [DEFAULT_PACKAGE_SHORT_NAME]

	Object addSupportPackage(String pkgName) {
		packageNames.add(pkgName - ~/^$DEFAULT_PACKAGE_PREFIX/)
		packageNames.toUnique()
		log.info "construct Marshaler for packages : $packageNames"
		return this
	}

	List<String> getSupportPackages() {
		return packageNames
	}

	boolean isPackageSupport(Package pkg) {
		return pkg == null ? false : isPackageSupport(pkg.name) 
	}

	boolean isPackageSupport(String pkgName) {
		return pkgName == null ? false : (pkgName - ~/^$DEFAULT_PACKAGE_PREFIX/) ==~ /${packageNames.join('|')}/
	}

	boolean isCollectionSupport(Object object) {
		// return object instanceof Set ||
		// 	object instanceof List && object.size() == 0 ||
		// 		object instanceof List && isPackageSupport((object?.first()?.class.package))
		return object instanceof Set ||
			object instanceof List && ( object.size() == 0 ||
				isPackageSupport((object?.first()?.class.package)) )
	}
}