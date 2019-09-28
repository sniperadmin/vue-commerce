<template>
  <div class="overview">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 align-items-center">
          <div class="col-md-6">
            <h1>{{ $t('adminPage.overview.title') }}</h1>
            <p>{{ $t('adminPage.overview.text') }}</p>
          </div>
          <div class="col-md-6">
              <img src="@/assets/img/overview.svg" class="img-fluid" alt="overview image">
          </div>
        </div>
      </div>
    </div>

    <b-alert show variant="info mt-2">
    <h4 class="alert-heading"><i class="fas fa-exclamation-triangle"></i> {{ $t('alerts.graph-construction.title') }}</h4>
    <hr>
    <p>
      {{ $t('alerts.graph-construction.body') }}
    </p>
    <p class="mb-0">
      {{ $t('alerts.graph-construction.p') }}
    </p>
  </b-alert>

  </div>
</template>
<script>

</script>
