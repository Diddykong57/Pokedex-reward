export PAGER

# Fetch init stack outputs
initStackName?=init-stack
environmentInitStackName?=environment-init-stack
templateBucket?=$(shell grep 'TemplateBucket' $(initStackName).outputs | cut -f2)
cloudformationRole?=$(shell grep 'CloudformationRole' $(initStackName).outputs | cut -f2)


# Make actual files corresponding to the name of the stacks to avoid rebuilding .outputs files every time
$(stackNames):
	@touch $@

# Make sure we remove the outputs if the command failed
.DELETE_ON_ERROR: %.outputs

# Loop through all stackNames and generate appropriate outputs
%.outputs: %
	@echo "Getting $< outputs"
	@aws cloudformation describe-stacks --stack-name $< \
		--region $(region) \
		--query "sort_by(Stacks[0].Outputs, &OutputKey)[*].[OutputKey, OutputValue]" \
		--output text > $@


node_modules: package-lock.json
	@npm ci
	@touch node_modules

clean-package:
	-@rm -f template-output.yml

template-output.yml: $(initStackName).outputs
	@echo Packaging
	sam package \
		--region $(region) \
		--template-file sam/template.yml \
		--s3-prefix $(pkg-name)/$(prId) \
		--s3-bucket $(templateBucket) \
		--output-template-file template-output.yml