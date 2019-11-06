vault {
  address = "http://vault.core.svc.cluster.local:8200"
  ssl {
    # This is terrible practice, will fix
    enabled = false
    verify = false
  }
  vault_agent_token_file = "/var/run/secrets/.vault-token"
  renew_token = true
}

consul {
  address = "http://consul.core.svc.cluster.local:8500"
}

###
# Application Templates live here 
#

// template {
//     destination = "/etc/postgrest.conf"
//     source = "/opt/conf/template/postgrest.conf"
//     error_on_missing_key = true
// }

exec {
  command = "npm start"
  splay = "2s"

  env {
    pristine = false
  }
  reload_signal = "SIGHUP"
  kill_signal = "SIGINT"
  kill_timeout = "2s"
}