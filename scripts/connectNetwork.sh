# Connect network
xcrun simctl status_bar "iPhone 15 Pro" override \
          --wifiBars 0 \
          --cellularBars 0 \
          --wifiMode failed \
          --cellularMode failed \
          --dataNetwork hide

# Disconnect network
xcrun simctl status_bar "iPhone 15 Pro" clear