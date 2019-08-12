Error creating bean with name 'seriesRoute': 
Unsatisfied dependency expressed through field 'fileSystem'; 
nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: 
Error creating bean with name 'externalSecureFileSystemWrapper': 
Unsatisfied dependency expressed through field 'secureFileSystem'; 
nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: 
Error creating bean with name 'secureFileSystem' defined in class path resource 
[org/iceo/bitbay/application/externals/filesystem/SecureFileSystemConfiguration.class]: 
Unsatisfied dependency expressed through method 'secureFileSystem' parameter 0; 
nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: 
Error creating bean with name 'secureFileSystemConfig' defined in file 
[/home/kamil-adam/git/bitbaypay/gift-cards/target/classes/org/iceo/bitbay/application/externals/filesystem/SecureFileSystemConfig.class]: 
Unsatisfied dependency expressed through constructor parameter 0; 
nested exception is org.springframework.beans.factory.NoSuchBeanDefinitionException: 
No qualifying bean of type 'java.lang.String' available: 
expected at least 1 bean which qualifies as autowire candidate. 
Dependency annotations: {}
