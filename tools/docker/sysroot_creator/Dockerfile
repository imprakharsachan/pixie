# Copyright 2018- The Pixie Authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# SPDX-License-Identifier: Apache-2.0

FROM debian:bookworm

COPY setup_arch.sh /scripts/setup_arch.sh

RUN mkdir -p /conf && \
  for arch in amd64 arm64; \
  do \
    /scripts/setup_arch.sh "$arch"; \
  done

RUN apt-get update -y

COPY build_tar_for_packages.sh /scripts/build_tar_for_packages.sh
COPY package_groups /package_groups

ENTRYPOINT ["/scripts/build_tar_for_packages.sh"]

VOLUME /build
