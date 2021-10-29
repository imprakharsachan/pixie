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

load("@io_bazel_rules_docker//container:container.bzl", "container_image")

def node_http_server_image(name, base):
    container_image(
        name = name,
        base = base,
        cmd = [
            "node",
            "/etc/node/https_server.js",
        ],
        layers = [
            "//src/stirling/source_connectors/socket_tracer/testing/containers/ssl:ssl_keys_layer",
            "//src/stirling/source_connectors/socket_tracer/testing/containers/ssl:node_client_server_layer",
        ],
    )
