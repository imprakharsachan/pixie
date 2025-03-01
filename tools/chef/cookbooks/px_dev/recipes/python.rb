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


if node.platform_family?('debian')
  apt_package ['python3-pip', 'python3.10', 'python3.10-dev'] do
    action :upgrade
  end
end

execute 'python alternatives selection' do
  command 'update-alternatives --install /usr/bin/python python /usr/bin/python3 100'
end
